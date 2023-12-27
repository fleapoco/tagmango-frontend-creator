import style from '../../../../style/task.module.scss';

export const RemarkBox = () => {
  return (
    <div className={`${style['quiz-remark-box-wrapper']}`}>
      <h2>Title</h2>
      <div className='quiz-remark-box'>
        <h3>Remarks</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, dolor.
        </p>
      </div>
    </div>
  );
};
