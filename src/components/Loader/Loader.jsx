import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css'

export default function Loader () {
  return (
      <div className={css.loader}>
      <Oval
      height={100}
      width={100}
      color="#E44848"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#E44848"
    />
    </div>
  );
};

