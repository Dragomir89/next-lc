function UserProfilePage(props) {
  return <h1>HI {props.username}</h1>;
}

export default UserProfilePage;
// тези страници не са прегенерирани когато билдваме проекта
// тези страници се генерират на сървъра след всеки рекуест и тук имаме възможност да изпращаме рекуест
// с информация от фронт-енд страна
export async function getServerSideProps(context) {
  // тук вече имаме достъп до req, res
  const { params, req, res } = context;

  console.log(context.req);
  return { props: { username: "Max" } };
}
