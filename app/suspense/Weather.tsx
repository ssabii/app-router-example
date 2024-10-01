import { wait } from "@/lib/wait";

async function Weather() {
  await wait(5000);

  return (
    <div className='text-lg font-bold'>
      Weather
    </div>
  );
}

export default Weather;