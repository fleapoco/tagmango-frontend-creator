import { ActionModal } from '../../../../components/common/modal';

export const DeleteRecuringWorkshop = () => {
  return (
    <>
      <ActionModal
        title={'Chetan'}
        children={undefined}
        show={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};
