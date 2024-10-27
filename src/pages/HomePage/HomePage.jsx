import Button from '../../components/Button/Button';
import traveltruck from '/images/traveltruck.jpg';
import css from './HomePage.module.css';

export default function Home () {
  return (
    <div
      className={css.background}
      style={{ backgroundImage: `url(${traveltruck})` }}>
      <h1 className={css.title}>Campers of your dreams</h1>
      <p className={css.text}>You can find everything you want in our catalog</p>
      <Button text='View Now' navigateTo="/catalog"/>
    </div>
  )
};
