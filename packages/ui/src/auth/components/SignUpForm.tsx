import {useCallback, useState, useEffect} from 'react';
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {useForm, FormProvider, useFormContext} from 'react-hook-form';

import {ThirdParty} from '@libs/config/auth';
import * as validates from '@libs/utils/validate';
import {useThrottle, useInterval} from '@libs/hooks';
import {useTranslate, useLang, getOldStandard} from '@libs/i18n';
import {OK_CODE} from '@libs/requests';
import analytics from '@libs/analytics';
import marketing from '@libs/marketing';

import ButtonLoading, {ButtonLoadingState} from '@widget/buttonLoading';
import {toast, error} from '@widget/toastify';

import {apiCheckEamilValid, apiSendEmail, IApiSendEmailParams, apiRegister, IApiRegisterParams} from '@app/auth/api';
import Assets from '@app/auth/assets/index';

import './SignUpForm.less';

/**
 * 声明
 * @param {string} email 邮箱
 * @param {string} password 密码
 * @param {string} otp 邮箱验证码
 * @param {string} referrer 推荐人
 * @param {number} agreement 协议
 */
interface IFormInput {
  email: string;
  password: string;
  otp: string;
  referrer: string;
  agreement: number;
}

/**
 * 输入框类型
 * NONE 无
 * EMAIL 邮箱
 * PASSWORD 密码
 * REFERRER 推荐人
 * OTP 验证码
 */
enum InputType {
  NONE,
  EMAIL,
  PASSWORD,
  REFERRER,
  OTP,
}

// 按钮
const Button = (props: {visible: boolean; id?: string}): JSX.Element => {
  const {trigger, getValues} = useFormContext();
  const t = useTranslate(['auth', 'error']);
  const {executeRecaptcha} = useGoogleReCaptcha();
  const {trackCode, agencyUser} = marketing.useMarketingInfo();
  const time = 120;
  const [seconds, setSeconds] = useState<number>(time);
  const [canTime, setCanTime] = useState<boolean>(false);

  useInterval(
    () => {
      if (seconds === 0) {
        setCanTime(false);
        setSeconds(time);
      } else {
        setSeconds(seconds - 1);
      }
    },
    canTime ? 1000 : null,
  );

  useEffect(() => {
    if (props.visible) {
      setCanTime(false);
      setSeconds(time);
    }
  }, [props.visible]);

  const onSend = async (): Promise<void> => {
    if (!executeRecaptcha) {
      return;
    }

    const verifyEmail = await trigger('email');
    const verifyPassword = await trigger('password');
    const verifyAgreement = await trigger('agreement');

    if (!verifyEmail || !verifyPassword || !verifyAgreement) {
      return;
    }

    const email = await getValues('email');
    const password = await getValues('password');
    const referrer = await getValues('referrer');

    if (canTime) {
      return;
    }

    setCanTime(true);

    try {
      const token: string = await executeRecaptcha('signup');
      const params: IApiSendEmailParams = {
        email,
        password,
        captcha: token,
        referrerUserId: referrer ? ('' + referrer).toUpperCase() : null,
      };

      if (!!trackCode) {
        params.trackCode = trackCode;
      }
      //代理用户名
      if (!!agencyUser) {
        params.agencyUser = decodeURI(agencyUser);
      }

      const res: any = await apiSendEmail(params);

      if (res.rspCode === OK_CODE) {
        toast(t('otp_success'));
      } else {
        // 提示登录异常
        console.log('error_' + res.rspCode);

        const msg: string = t('error:error_' + res.rspCode);

        if (msg) {
          error(msg);
        } else {
          error(t('otp_fail'));
        }

        setCanTime(false);
        setSeconds(time);
      }
    } catch (err) {
      setCanTime(false);
      setSeconds(time);

      error(t('otp_fail'));

      console.log(err);
    }
  };

  if (canTime) {
    return <div className="form-btn form-btn_disable">{seconds + 's'}</div>;
  } else {
    return (
      <button id={props.id ? props.id : ''} type="button" className="form-btn form-btn_otp" onClick={onSend}>
        {t('get_otpCode')}
      </button>
    );
  }
};

// 表单
const Form = (props: {visible: boolean}): JSX.Element => {
  const t = useTranslate(['auth', 'error']);
  const {trackCode, invite, agencyUser} = marketing.useMarketingInfo();
  const methods = useForm<IFormInput>({
    mode: 'onBlur',
    defaultValues: {
      referrer: invite,
    },
  });
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = methods;

  const [autocompleteState, setAutocompleteState] = useState<boolean>(false);
  const [emailVerify, setEmailVerify] = useState<boolean>(false);
  const [emailErrorCode, setEmailErrorCode] = useState<string>('email_required');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [inputTypeFocus, setInputTypeFocus] = useState<number>(InputType.NONE);
  const [buttonState, setButtonState] = useState<number>(ButtonLoadingState.DEFAULT);

  const onVisible = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  useEffect(() => {
    if (props.visible) {
      reset();

      setPasswordVisible(false);

      setButtonState(ButtonLoadingState.DEFAULT);
    }
  }, [props.visible, reset]);

  const onSubmit = useThrottle(async (data: IFormInput): Promise<void> => {
    setButtonState(ButtonLoadingState.LOADING);

    analytics.customEvent('Signup', {
      desc: '点击注册按钮',
    });

    try {
      const params: IApiRegisterParams = {
        email: data.email,
        password: data.password,
        otpCode: data.otp,
        referrerUserId: data.referrer ? ('' + data.referrer).toUpperCase() : null,
      };
      if (!!trackCode) {
        params.trackCode = trackCode;
      }
      //代理用户名
      if (!!agencyUser) {
        params.agencyUser = decodeURI(agencyUser);
      }

      const res: any = await apiRegister(params);

      if (res.rspCode === OK_CODE) {
        setButtonState(ButtonLoadingState.SUCCESS);

        analytics.customEvent('SignIn_success', {
          desc: '注册成功',
          code: params.referrerUserId,
        });

        // window.dataLayer.push({
        //   event: 'sign_up',
        //   method: analytics.loginType.BITGAME,
        //   'country code': regionIp,
        // });

        // appsFlyer.track('Signup_success', 's2s');

        // registerGift(res.rspCode);

        toast(t('register_success'));
      } else {
        // 提示登录异常
        console.log('error_' + res.rspCode);

        const msg: string = t('error:error_' + res.rspCode);

        if (msg) {
          error(msg);
        } else {
          error(t('register_fail'));
        }

        setButtonState(ButtonLoadingState.DEFAULT);
      }
    } catch (err) {
      console.log(err);

      error(t('register_fail'));

      setButtonState(ButtonLoadingState.DEFAULT);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="ui-auth_form form" autoComplete="off">
        <div className="form-item">
          <div className={inputTypeFocus === InputType.EMAIL ? 'form-item_input form-item_focus' : 'form-item_input'}>
            <input
              type="text"
              placeholder={t('email_placeholder')}
              onFocus={() => {
                setInputTypeFocus(InputType.EMAIL);

                clearErrors('email');
              }}
              {...register('email', {
                required: true,
                validate: async (value): Promise<boolean> => {
                  const result: boolean = validates.email(value);

                  if (!result) {
                    setEmailErrorCode('email_required');

                    setEmailVerify(result);

                    return false;
                  }

                  try {
                    const res: any = await apiCheckEamilValid({email: value});
                    const msg: string = t('error:error_' + res.rspCode);

                    if (msg) {
                      setEmailErrorCode('error:error_' + res.rspCode);
                    } else {
                      setEmailErrorCode('email_required');
                    }

                    setEmailVerify(res.rspCode === OK_CODE);

                    return res.rspCode === OK_CODE;
                  } catch (err) {
                    setEmailErrorCode('email_required');

                    setEmailVerify(false);

                    return false;
                  }
                },
                onBlur: () => {
                  setInputTypeFocus(InputType.NONE);
                },
              })}
            />
            <div>
              <Assets.IconCorrect
                className={
                  emailVerify && !!getValues('email') && getValues('email').length
                    ? 'form-item_correct visible'
                    : 'form-item_correct'
                }
              />
            </div>
          </div>
          <p className="form-item_error">{errors.email && t(emailErrorCode)}</p>
        </div>
        <div className="form-item">
          <div
            className={inputTypeFocus === InputType.PASSWORD ? 'form-item_input form-item_focus' : 'form-item_input'}
          >
            <input
              type={!autocompleteState || passwordVisible ? 'text' : 'password'}
              placeholder={t('password_placeholder')}
              onFocus={() => {
                setInputTypeFocus(InputType.PASSWORD);

                setAutocompleteState(true);

                clearErrors('password');
              }}
              {...register('password', {
                required: true,
                maxLength: 32,
                validate: value => {
                  return validates.password(value);
                },
                onBlur: () => {
                  setInputTypeFocus(InputType.NONE);
                },
              })}
            />
            <div>
              {passwordVisible ? (
                <Assets.BtnPasswordShow className="form-btn_password" onClick={onVisible} />
              ) : (
                <Assets.BtnPasswordHide className="form-btn_password" onClick={onVisible} />
              )}
            </div>
          </div>
          <p className="form-item_error">{errors.password && t('password_error')}</p>
        </div>
        <div className="form-item">
          <div className={inputTypeFocus === InputType.OTP ? 'form-item_input form-item_focus' : 'form-item_input'}>
            <input
              type="text"
              placeholder={t('password_otpCode')}
              onFocus={() => {
                setInputTypeFocus(InputType.OTP);

                clearErrors('otp');
              }}
              {...register('otp', {
                required: true,
                maxLength: 6,
                validate: value => {
                  return validates.OTPCode(value);
                },
                onBlur: () => {
                  setInputTypeFocus(InputType.NONE);
                },
              })}
            />
            <Button visible={props.visible} id="sign_up_sendcode" />
          </div>
          <p className="form-item_error">{errors.otp && t('password_otpCode_correct')}</p>
        </div>
        <div className="form-item" style={{display: trackCode !== '' ? 'none' : 'block'}}>
          <div
            className={inputTypeFocus === InputType.REFERRER ? 'form-item_input form-item_focus' : 'form-item_input'}
          >
            <fieldset disabled={typeof invite === 'string' && invite !== ''}>
              <input
                type="text"
                placeholder={t('placeholder_invite_code')}
                onFocus={() => {
                  setInputTypeFocus(InputType.REFERRER);

                  clearErrors('referrer');
                }}
                {...register('referrer', {
                  maxLength: 11,
                  validate: value => {
                    return validates.inviteCode(value);
                  },
                  onBlur: () => {
                    setInputTypeFocus(InputType.NONE);
                  },
                })}
              />
            </fieldset>
          </div>
          <p className="form-item_error">{errors.referrer && t('rules_invite_code')}</p>
        </div>
        <div className="form-item">
          <dl className="form-item_checkbox">
            <dt>
              <input
                type="checkbox"
                id="agreement"
                {...register('agreement', {
                  required: true,
                })}
              />
              <Assets.IconChecked />
            </dt>
            <dd>
              <label htmlFor="agreement">
                {t('agree_left')}&nbsp;
                <a href={`/about/terms_of_use`} target="_blank" title={t('agree_rules')} rel="noopener noreferrer">
                  {t('agree_rules')}
                </a>
                &nbsp;{t('and')}&nbsp;
                <a href={`/about/privacy_service`} target="_blank" title={t('agree_privacy')} rel="noopener noreferrer">
                  {t('agree_privacy')}
                </a>
              </label>
            </dd>
          </dl>
          <p className="form-item_error">{errors.agreement && t('agree_checked')}</p>
        </div>
        <div className="form-btn form-btn_signup">
          <ButtonLoading type="submit" state={buttonState}>
            {t('register_submit')}
          </ButtonLoading>
        </div>
      </form>
    </FormProvider>
  );
};

// 注册表单
const SignUpForm = (props: {visible: boolean}): JSX.Element => {
  const lang = useLang();

  return (
    <GoogleReCaptchaProvider reCaptchaKey={ThirdParty.GOOGLE_RECAPTCHA} language={getOldStandard(lang)}>
      <Form visible={props.visible} />
    </GoogleReCaptchaProvider>
  );
};

export default SignUpForm;
