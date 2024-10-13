import Button from './Button';
import Input from './Input';

function Login() {
  return (
    <div className="flex flex-col gap-2">
      <h1>로그인</h1>
      <Input type="email" />
      <Input type="password" />
      <Button>로그인</Button>
    </div>
  );
}

export default Login;