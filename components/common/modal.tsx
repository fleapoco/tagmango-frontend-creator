import { Modal } from "antd";
import { useEffect, useState } from "react";

export interface ModalProps {
  title: string;
  children: React.ReactNode;
  show: boolean;
  className?: string;
  onClose: () => void;
  footer?: React.ReactNode;
}

export const ActionModal: React.FC<ModalProps> = ({
  children,
  show,
  onClose,
  footer,
  className,
  title,
}) => {
  const [open, setOpen] = useState(show);

  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    if (!show) {
      onClose();
    }
  }, [show, onClose]);

  return (
    <>
      <Modal
        title={title}
        open={show}
        onCancel={handleCancel}
        footer={[footer]}
        className={`${className} modal-wrapper`}
      >
        {children}
      </Modal>
    </>
  );
};
