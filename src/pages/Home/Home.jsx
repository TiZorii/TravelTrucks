import camper from '../../images/camper.jpg';
import css from './Home.module.css';

export default function Home () {
  return (
    <div
      className={css.background}
      style={{ backgroundImage: `url(${camper})` }}>
      <h1 className={css.title}>Campers of your dreams</h1>
      <p className={css.text}>You can find everything you want in our catalog</p>
      <button className={css.button} >View Now</button>
    </div>
  )
};
