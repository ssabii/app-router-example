import Content from './Content';

const getImageContent = (): Promise<string> => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`
        <h1>이미지가 포함된 컨텐츠</h1>
        <img src="https://placehold.co/100x100" alt="첫 번째 이미지" />
        <img src="https://placehold.co/400x200" alt="두 번째 이미지" />
        <img src="https://placehold.co/800x640" alt="세 번째 이미지" />
      `)
    }, 500)
  })
};

async function Page() {
  const content = await getImageContent();

  return (
    <Content content={content} />
  )
}

export default Page;