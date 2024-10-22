// import { useDispatch } from 'react-redux';
// import { Controller, useForm } from 'react-hook-form';
// import 'react-datepicker/dist/react-datepicker.css';
// import { bookCamper } from '../../redux/adverts/advertsSlice';
// import sprite from '../../images/sprite.svg';
// import {
//   Button,
//   DatePickerWrapper,
//   Error,
//   Form,
//   Input,
//   StyledDatePicker,
//   Text,
//   Textarea,
//   Title,
// } from './BookingForm.styled';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './styles.css';



// export default function BookingForm () {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//     control,
//   } = useForm();

//   const dispatch = useDispatch();

//   const onSubmit = data => {
//     const formData = {
//       name: data.name,
//       email: data.email,
//       date: data.date.toISOString(),
//       comment: data.comment,
//     };

//     dispatch(bookCamper(formData));

//     toast.success('Successfully sent!', {
//       theme: 'colored',
//       autoClose: 2500,
//     });

//     console.log(data);
//     reset();
//   };

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <Title>Book your campervan now</Title>
//       <Text>Stay connected! We are always ready to help you.</Text>

//       <Input
//         type="text"
//         placeholder="Name"
//         {...register('name', { required: 'Name is required' })}
//       />
//       {errors.name && <Error>{errors.name.message}</Error>}

//       <Input
//         type="email"
//         placeholder="Email"
//         {...register('email', { required: 'Email is required' })}
//       />
//       {errors.email && <Error>{errors.email.message}</Error>}

//       <Controller
//         control={control}
//         name="date"
//         rules={{ required: 'Date is required' }}
//         render={({ field }) => (
//           <DatePickerWrapper>
//             <StyledDatePicker
//               {...field}
//               minDate={new Date()}
//               calendarStartDay={1}
//               dateFormat="d MMM yyyy"
//               selected={field.value}
//               onChange={val => setValue('date', val)}
//               placeholderText="Booking date"
//               autoComplete="off"
//             />
//             <svg width="18" height="18" fill="none" stroke="currentColor">
//               <use href={`${sprite}#icon-calendar`} />
//             </svg>
//           </DatePickerWrapper>
//         )}
//       />
//       {errors.date && <Error>{errors.date.message}</Error>}

//       <Textarea placeholder="Comment" {...register('comment')} rows="4" />

//       <Button type="submit">Send</Button>
//     </Form>
//   );
// };

