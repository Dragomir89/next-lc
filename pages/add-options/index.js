import AddOptionInput from "../../components/add-options-components/AddOptionInput";

function AddOptions(props) {
  return (
    <div>
      <div style={{ width: "570px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>Добави опции</h1>
        <AddOptionInput
          optionType="constructionTypes"
          label={"Вид Строителство"}
          btnText="Добави Строителство"
        />
        <AddOptionInput
          optionType="propertyTypes"
          label="Вид Имот"
          btnText="Добави Вид Имот"
        />
        <AddOptionInput
          optionType="states"
          label="Състояние"
          btnText="Добави Състояние"
        />
        <AddOptionInput
          optionType="neighborhoods"
          label="Квартал"
          btnText="Добави Квартал"
        />
        <AddOptionInput
          optionType="broker"
          label="Брокер"
          btnText="Добави Брокер"
        />
      </div>
    </div>
  );
}

// изпълнява се тази функция
// след което се извиква ф-ята на компунента
// след това рендериранният HTML на съвъра се пръща на клиента
export async function getStaticProps() {
  console.log("call on server getStaticProps");

  return {
    props: {},
    // revalidate: 15, /// ако го има това проп, информацията ще се ъпдейтва на всеки Х секунди
    // секундите работят само когато се билдне проекта
  };
}

export default AddOptions;
