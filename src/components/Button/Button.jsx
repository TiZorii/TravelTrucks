import { useNavigate } from 'react-router-dom';
import css from './Button.module.css';

export default function Button({ text, navigateTo, onClick }) {
    const navigate = useNavigate();
    const handleClick = () => {
        if (navigateTo) {
            navigate(navigateTo);
        }

        if (onClick) {
            onClick();
        }
    };

    return (
        <button className={css.button} onClick={handleClick}>
            {text}
        </button>
    );
};