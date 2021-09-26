import { useForm } from "react-hook-form";
import { BookProperties } from "../../book";

export const BookDetails = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: BookProperties) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group row'>
          <label htmlFor='authors' className='col-sm-3 col-form-label'>
            Authors:
          </label>
          <div className='col-sm-9'>
            <input {...register("authors")} className='form-control' />
          </div>
        </div>
        <div className='form-group row'>
          <label htmlFor='title' className='col-sm-3 col-form-label'>
            Title:
          </label>
          <div className='col-sm-9'>
            <input {...register("title")} className='form-control' />
          </div>
        </div>
        <div className='form-group row'>
          <div className='offset-sm-3 col-sm-9'>
            <button className='btn btn-primary'>Apply</button>
          </div>
        </div>
      </form>
    </div>
  );
};
