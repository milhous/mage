import Assets from '@app/auth/assets';

// 关闭按钮
const ButtonClose = (props: {id: string; onClose: () => void}): JSX.Element => {
  const {id = '', onClose} = props;

  const handleClose = () => {
    !!onClose && onClose();
  };

  return (
    <div className="ui-auth_btnClose">
      <Assets.BtnLoginClose id={id} onClick={handleClose} />
    </div>
  );
};

export default ButtonClose;
