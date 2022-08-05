import {useCallback, useState, useEffect, memo} from 'react';
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {useForm} from 'react-hook-form';

import {ModalType} from '@libs/config';
import {ThirdParty} from '@libs/config/auth';
import {useTranslate, useLang, getOldStandard} from '@libs/i18n';
import {useThrottle} from '@libs/hooks';
import {OK_CODE} from '@libs/requests';
import {showModal} from '@libs/modal';
import analytics from '@libs/analytics';
import * as validates from '@libs/utils/validate';

import ButtonLoading, {ButtonLoadingState} from '@widget/buttonLoading';
import {error} from '@widget/toastify';

import {apiLogin} from '@app/auth/api';

import Assets from '@app/auth/assets/index';

// 样式
import './LoginForm.less';

/**
 * 声明
 * @param {string} username 用户名
 * @param {string} password 密码
 */
interface IFormInput {
  username: string;
  password: string;
}

/**
 * 输入框类型
 * NONE 无
 * USERNAME 用户名
 * PASSWORD 密码
 */
enum InputType {
  NONE,
  USERNAME,
  PASSWORD,
}

// 表单
const Form = (props: {visible: boolean}): JSX.Element => {
  const t = useTranslate(['auth']);
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });
  const {executeRecaptcha} = useGoogleReCaptcha();

  const [autocompleteState, setAutocompleteState] = useState<boolean>(false);
  const [usernameVerify, setUsernameVerify] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [inputTypeFocus, setInputTypeFocus] = useState<number>(InputType.NONE);
  const [buttonState, setButtonState] = useState<number>(ButtonLoadingState.DEFAULT);

  const onVisible = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const onForget = useCallback((evt: React.MouseEvent) => {
    evt.preventDefault();

    showModal(ModalType.FORGET_PASSWORD);
  }, []);

  useEffect(() => {
    if (props.visible) {
      reset();

      setPasswordVisible(false);

      setButtonState(ButtonLoadingState.DEFAULT);
    }
  }, [props.visible, reset]);

  const onSubmit = useThrottle(async (data: IFormInput): Promise<void> => {
    if (!executeRecaptcha) {
      return;
    }

    setButtonState(ButtonLoadingState.LOADING);

    analytics.customEvent('Login', {
      desc: '点击登录按钮',
    });

    try {
      const token: string = await executeRecaptcha('login');
      const res: any = await apiLogin({
        userName: data.username,
        password: data.password,
        captcha: token,
      });

      // showLoginToast(res.rspCode);

      if (res.rspCode === OK_CODE) {
        setButtonState(ButtonLoadingState.SUCCESS);
      } else {
        setButtonState(ButtonLoadingState.DEFAULT);
      }
    } catch (err) {
      console.log(err);

      error(t('login_fail'));

      setButtonState(ButtonLoadingState.DEFAULT);
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ui-auth_form form" autoComplete="off">
      <div className="form-item">
        <div className={inputTypeFocus === InputType.USERNAME ? 'form-item_input form-item_focus' : 'form-item_input'}>
          <input
            type="text"
            placeholder={t('username_placeholder')}
            onFocus={() => {
              setInputTypeFocus(InputType.USERNAME);

              clearErrors('username');
            }}
            {...register('username', {
              required: true,
              validate: value => {
                const result: boolean = validates.username(value);

                setUsernameVerify(result);

                return result;
              },
              onBlur: () => {
                setInputTypeFocus(InputType.NONE);
              },
            })}
          />
          <div>
            <Assets.IconCorrect
              className={
                usernameVerify && !!getValues('username') && getValues('username').length
                  ? 'form-item_correct visible'
                  : 'form-item_correct'
              }
            />
          </div>
        </div>
        <p className="form-item_error">{errors.username && t('username_required')}</p>
      </div>
      <div className="form-item">
        <div className={inputTypeFocus === InputType.PASSWORD ? 'form-item_input form-item_focus' : 'form-item_input'}>
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
              minLength: 8,
              maxLength: 32,
              validate: value => {
                return validates.passwordRequired(value);
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
        <p className="form-item_error">{errors.password && t('password_required')}</p>
      </div>
      <p className="forget-password">
        <span onClick={onForget}>{t('forget_password')}</span>
      </p>
      <div className="form-btn form-btn_login">
        <ButtonLoading type="submit" state={buttonState}>
          {t('login_submit')}
        </ButtonLoading>
      </div>
    </form>
  );
};

// 登录表单
const LoginForm = (props: {visible: boolean}): JSX.Element => {
  const lang = useLang();

  return (
    <GoogleReCaptchaProvider reCaptchaKey={ThirdParty.GOOGLE_RECAPTCHA} language={getOldStandard(lang)}>
      <Form visible={props.visible} />
    </GoogleReCaptchaProvider>
  );
};

export default LoginForm;
