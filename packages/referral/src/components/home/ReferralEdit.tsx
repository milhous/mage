// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import classnames from 'classnames';
// import { useTranslation } from 'react-i18next';
// import SVG from 'react-inlinesvg';
// import { useForm } from 'react-hook-form';

// import { toast, error } from '@ui/Toastify';
// import { ButtonLoading, ButtonLoadingState } from '@ui/ButtonLoading';
// import Modal from '@ui/Modal';
// import analytics from '@libs/analytics';
// import { useThrottle } from '@libs/utils/hooks';

// import i18n from '@/config/i18n';
// import { OK_CODE, apiGetInvitationRemark } from '@/api';
// import { ReferralEventType } from '@/api/hook';
// import assets from '@/assets';
// import './ReferralEdit.less';

// /**
//  * 声明
//  * @param {string} remark 备注
//  */
// interface IFormInput {
//     remark: string;
// }

// /**
//  * 输入框类型
//  * NONE 无
//  * REMARK 备注
//  */
//  enum InputType {
//     NONE,
//     REMARK
//   }

// type ContainerProps = {
//     visible?: boolean;
//     btnClose?: React.ReactNode;
// };

// // 备注名
// let remark = '';
// // 邀请码
// let inviteCode = '';

// // 容器
// const Container: React.FC<ContainerProps> = (props) => {
//     const { t } = useTranslation(['referral', 'error'], { i18n });
//     const { register, reset, getValues, errors, handleSubmit, clearErrors } = useForm<IFormInput>({
//         mode: 'onBlur',
//     });

//     const [inputTypeFocus, setInputTypeFocus] = useState<number>(InputType.NONE);
//     const [buttonState, setButtonState] = useState<number>(ButtonLoadingState.DEFAULT);

//     const onSubmit = useThrottle(async (data: IFormInput): Promise<void> => {
//         if (remark === data.remark) {
//             return;
//         }

//         setButtonState(ButtonLoadingState.LOADING);

//         try {
//             const res: any = await apiGetInvitationRemark({
//                 name: data.remark,
//                 inviteCode
//             });

//             const code = res.rspCode;

//             if (code === OK_CODE) {
//                 analytics.customEvent('Refferals_tab_link_Edit_note_success', {
//                     desc: '修改备注成功',
//                 });

//                 toast(t('modify_succeed'));

//                 window.dispatchEvent(new CustomEvent(ReferralEventType.GET_CHANNEL));

//                 close();
//             } else {
//                 const msg: string = i18n.t('error:error_' + code);

//                 if (msg) {
//                     error(msg);
//                 } else {
//                     error(t('modify_failed'));
//                 }
//             }

//             setButtonState(ButtonLoadingState.DEFAULT);
//           } catch (err) {
//             const msg: string = i18n.t('error:error_' + err);

//             if (msg) {
//                 error(msg);
//             } else {
//                 error(t('modify_failed'));
//             }

//             setButtonState(ButtonLoadingState.DEFAULT);
//         }
//     });

//     return (
//         <div className="btg-pop create-container">
//             <div className="create-title">
//                 <h3>{t('modify_remark')}</h3>
//                 <button className="btn-close">
//                     <SVG src={assets.iconClose} onClick={close} />
//                 </button>
//             </div>
//             <div className="create-line"></div>
//             <div className="create-form">
//             <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
//                 <div className="form-item">
//                     <div className={inputTypeFocus === InputType.REMARK ? 'form-item_input form-item_focus' : 'form-item_input'}>
//                         <input
//                             defaultValue={remark}
//                             name="remark"
//                             type="text"
//                             placeholder={t('input_remark')}
//                             maxLength={30}
//                             onBlur={() => {
//                                 setInputTypeFocus(InputType.NONE);
//                             }}
//                             onFocus={() => {
//                                 setInputTypeFocus(InputType.REMARK);

//                                 clearErrors('remark');
//                             }}
//                             ref={register({
//                                 required: true
//                             })}
//                         />
//                     </div>
//                 </div>
//                 <div className="form-btn btn-create">
//                     <ButtonLoading type="submit" state={buttonState}>
//                         {t('btn_modify')}
//                     </ButtonLoading>
//                 </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// let elem: HTMLDivElement;
// let isRender = false;
// let visible: boolean, setVisible: any;

// // 登录
// const Comp = (): JSX.Element => {
//     [visible, setVisible] = useState(false);

//     const onCancel = () => {
//         setVisible(false);
//     };

//     return (
//         <Modal
//         className={classnames('referral-create')}
//         visible={visible}
//         onCancel={onCancel}
//         bodyStyle={undefined}
//         domContainer={elem}
//         isDestroy={true}
//         >
//             <React.Suspense fallback="Loading">
//                 <Container visible={visible} />
//             </React.Suspense>
//         </Modal>
//     );
// };

// // 显示
// export const show = (params: { remark: string; code: string; }): void => {
//     remark = params.remark;
//     inviteCode = params.code;

//     if (!elem) {
//         elem = document.createElement('div');
//         document.body.appendChild(elem);
//     }

//     if (!isRender) {
//         isRender = true;

//         ReactDOM.render(React.createElement(Comp), elem);
//     }

//     if (setVisible) {
//         setTimeout(() => setVisible(true));
//     }
// };

// // 关闭
// export const close = (): void => {
//     if (setVisible) {
//         setVisible(false);
//     }
// };
