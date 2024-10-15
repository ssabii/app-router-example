import Link from 'next/link';
import Button from './Button';
import Input from './Input';

function Login() {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className='text-2xl font-bold'>로그인</h1>
      <Input
        type="email"
        className='w-full'
      />
      <Input
        type="password"
        className='w-full'
      />
      <Button className='w-full'>로그인</Button>
      <Link
        href="/"
        className='text-lg font-bold text-gray-500'
      >
        홈으로
      </Link>
    </div>
  );
}

export default Login;