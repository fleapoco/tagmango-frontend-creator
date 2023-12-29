import style from '../../../../style/task.module.scss';

export interface RemarkProps {
  title?: React.ReactNode;
}

export const RemarkBox: React.FC<RemarkProps> = ({ title }) => {
  return (
    <div className={`${style['quiz-remark-box-wrapper']}`}>
      <h2>{title}</h2>
      <div className='quiz-remark-box'>
        <h3>Remarks</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, dolor.
        </p>
      </div>
    </div>
  );
};
