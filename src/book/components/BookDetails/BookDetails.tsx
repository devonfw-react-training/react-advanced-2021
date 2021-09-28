import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useBookService } from "../../services/BookService";
import { Book, BookProperties } from "../../book";
import { useMutation, useQuery } from "react-query";

interface ParamTypes {
  id: string;
}

export const BookDetails = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams<ParamTypes>();
  const { push } = useHistory();
  const { save, saveNew, findOne } = useBookService();

  const options = {
    onSuccess: () => {
      push("/books");
    },
  };

  const { data: book } = useQuery(["book"], () => findOne(+id));
  const { mutate: create } = useMutation<any, Error, BookProperties>(
    saveNew,
    options,
  );
  const { mutate: update } = useMutation<any, Error, Book>(save, options);
  useEffect(() => {
    if (id) {
      reset(book);
    }
  }, [book]);

  const onSubmit = (data: BookProperties) => {
    if (id) {
      update({ id: +id, ...data });
    } else {
      create(data);
    }
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
