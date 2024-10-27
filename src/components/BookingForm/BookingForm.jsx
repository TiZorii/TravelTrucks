import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { bookCamper } from '../../redux/campers/slice';
import sprite from '/images/sprite.svg';
import DatePicker from 'react-datepicker';
import toast, { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import css from './BookingForm.module.css';

export default function BookingForm () {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        control,
    } = useForm({mode: 'onChange'});

    const dispatch = useDispatch();
    const onSubmit = data => {
        const formData = {
            name: data.name,
            email: data.email,
            date: data.date.toISOString(),
            comment: data.comment,
        };

        dispatch(bookCamper(formData));

        toast.success('Successfully sent!', {
            theme: 'colored',
            autoClose: 2500,
        });

        console.log(data);
        reset();
    };

    const [isSelecting, setIsSelecting] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <Toaster position="top-right" reverseOrder={false} />
            <p className={css.title}>Book your campervan now</p>
            <p className={css.text}>Stay connected! We are always ready to help you.</p>

            <input
                type="text"
                placeholder="Name*"
                {...register('name', { required: 'Name is required' })}
                className={css.input}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}

            <input
                type="email"
                placeholder="Email*"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                        message: 'Invalid email format'
        }
    })}
   className={css.input}
            />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}

            <Controller
                control={control}
                name="date"
                rules={{ required: 'Date is required' }}
                render={({ field }) => (
                    <div className={css.datePickerWrapper}>
                        <DatePicker
                            {...field}
                            minDate={new Date()}
                            calendarStartDay={1}
                            dateFormat="d MMM yyyy"
                            selected={field.value}
                            onChange={val => {
                                field.onChange(val);
                                setValue('date', val);
                            }}
                            onCalendarOpen={() => setIsSelecting(true)}
                            onCalendarClose={() => setIsSelecting(false)}
                            placeholderText={isSelecting ? "Select a date between today" : "Booking date*"} 
                            autoComplete="off"
                            className={css.datePicker}
                        />
                        <svg width="18" height="18" fill="none" stroke="currentColor">
                            <use href={`${sprite}#icon-calendar`} />
                        </svg>
                    </div>
                )}
            />
            {errors.date && <p className={css.error}>{errors.date.message}</p>}

            <textarea
                placeholder="Comment"
                {...register('comment')}
                rows="4"
                className={css.textarea}
            />

            <button type="submit" className={css.button}>Send</button>
        </form>
    );
};
