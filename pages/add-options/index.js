import { Fragment, useEffect, useState } from "react";
import AddOptionInput from "../../components/add-options-components/AddOptionInput";

function AddOptions(props) {
  const [allOptions, setAllOptions] = useState({});

  const fetchAllOptions = () => {
    fetch("/api/get-all-opitions", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setAllOptions(data));
  };

  useEffect(() => {
    fetchAllOptions();
  }, []);

  const handleClick = (newOption) => {
    fetch("/api/post-add-option", {
      method: "POST",
      body: JSON.stringify(newOption),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchAllOptions();
      });
  };

  return (
    <Fragment>
      <div style={{ padding: "10px", width: "500px" }}>
        <AddOptionInput
          optionType="constructionTypes"
          existingOptions={allOptions.constructionTypes}
          handleClick={handleClick}
          label={"Вид Строителство"}
          btnText="Добави Строителство"
        />
        <AddOptionInput
          optionType="propertyTypes"
          existingOptions={allOptions.propertyTypes}
          handleClick={handleClick}
          label="Вид Имот"
          btnText="Добави Вид Имот"
        />
        <AddOptionInput
          optionType="states"
          existingOptions={allOptions.states}
          handleClick={handleClick}
          label="Състояние"
          btnText="Добави Състояние"
        />
        <AddOptionInput
          optionType="neighborhoods"
          existingOptions={allOptions.neighborhoods}
          handleClick={handleClick}
          label="Квартал"
          btnText="Добави Квартал"
        />
      </div>
    </Fragment>
  );
}

// изпълнява се тази функция
// след което се извиква ф-ята на компунента
// след това рендериранният HTML на съвъра се пръща на клиента
// export async function getStaticProps() {
//   console.log("call on server getStaticProps");

//   return {
//     props: { test: "test" },
//     revalidate: 15, /// ако го има това проп, информацията ще се ъпдейтва на всеки Х секунди
//     // секундите работят само когато се билдне проекта
//   };
// }

export default AddOptions;
