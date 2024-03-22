import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const CardCreator = () => {
  const [cardFields, setCardFields] = useState({
    card1: {
      name: "",
      description: "",
      dueDate: "",
      labels: "",
    },
    card2: {
      name: "",
      description: "",
      dueDate: "",
      labels: "",
    },
    card3: {
      name: "",
      description: "",
      dueDate: "",
      labels: "",
    },
  });
  const [listIds] = useState({
    card1: "65fb370808a452baa23feb21",
    card2: "65fb370808a452baa23feb22",
    card3: "65fb370808a452baa23feb23",
  });
  const [expandedSelect, setExpandedSelect] = useState(null);
  const handleFieldChange = (e, cardKey, field) => {
    if (field === "labels") {
      const selectedLabels = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setCardFields({
        ...cardFields,
        [cardKey]: {
          ...cardFields[cardKey],
          labels: selectedLabels,
        },
      });
    } else {
      setCardFields({
        ...cardFields,
        [cardKey]: {
          ...cardFields[cardKey],
          [field]: e.target.value,
        },
      });
    }
  };

  const handleCreateCard = async (cardKey) => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=e24a0e1d593d800c79d8878f147d5f2a&token=ATTAaa26445153f48244110f79f0d09f48ad01b17b3843c8bcd7715b17056f35900bC1893BC7&name=${
          cardFields[cardKey].name
        }&desc=${cardFields[cardKey].description}&idList=${
          listIds[cardKey]
        }&due=${cardFields[cardKey].dueDate}&idLabels=${cardFields[
          cardKey
        ].labels.join(",")}`
      );
      alert("Card criado!", response.data);
    } catch (error) {
      alert("Erro ao criar card!", error);
    }
  };
  const handleSelectClick = (cardKey) => {
    setExpandedSelect(expandedSelect === cardKey ? null : cardKey);
  };

  return (
    <div className="cards">
      {[1, 2, 3].map((cardNumber) => (
        <div key={`card${cardNumber}`}>
          <div>
            <p>Título</p>
            <input
              type="text"
              placeholder={`Título do Cartão ${cardNumber}`}
              value={cardFields[`card${cardNumber}`].name}
              onChange={(e) =>
                handleFieldChange(e, `card${cardNumber}`, "name")
              }
            />
          </div>
          <div>
            <p>Descrição</p>
            <input
              type="text"
              placeholder={`Adicione a descrição do cartão ${cardNumber}`}
              value={cardFields[`card${cardNumber}`].description}
              onChange={(e) =>
                handleFieldChange(e, `card${cardNumber}`, "description")
              }
            />
          </div>
          <div>
            <select
              className={
                expandedSelect === `card${cardNumber}` ? "expanded" : ""
              }
              onClick={() => handleSelectClick(`card${cardNumber}`)}
              value={cardFields[`card${cardNumber}`].labels}
              onChange={(e) =>
                handleFieldChange(e, `card${cardNumber}`, "labels")
              }
            >
              <option value="65fd61f8be1ecc0d48960807">Nova tarefa</option>
              <option value="65fd61a63b9be17f6df86e68">Em andamento</option>
              <option value="65fc3d8fcd96f53ca20878d7">Concluído</option>
            </select>
          </div>
          <div>
            <p>Data de Vencimento do Cartão</p>
            <input
              type="date"
              value={cardFields[`card${cardNumber}`].dueDate}
              onChange={(e) =>
                handleFieldChange(e, `card${cardNumber}`, "dueDate")
              }
            />
          </div>

          <div>
            <button onClick={() => handleCreateCard(`card${cardNumber}`)}>
              Criar Cartão {cardNumber}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCreator;
