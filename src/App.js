import { useState } from "react";
import "./index.css";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];
export default function App() {
  const [items, setItems] = useState([]);
  function addItem(item) {
    return setItems((items) => [...items, item]);
  }
  function deleteitem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function toggleitem(id) {
    setItems(
      items.map((item) =>
        item.id == id ? { ...item, packed: !item.packed } : { ...item }
      )
    );
  }

  function clearall() {
    const confirm = window.confirm(
      "Are you sure you want to delete all items ?!"
    );

    if (confirm) setItems([]);
  }
  return (
    <div>
      <Logox />
      <Form onadditem={addItem} />
      <Body
        items={items}
        ondelete={deleteitem}
        ontoggle={toggleitem}
        onclear={clearall}
      />
      <Footer items={items} />
    </div>
  );
}
function Logox() {
  return <h1>✈️ FAR AWAY !🏖️</h1>;
}
function Form({ onadditem }) {
  const [describtion, setDescribtion] = useState("");
  const [numx, setNumx] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!describtion) return;
    const newItem = { describtion, numx, packed: false, id: Date.now() };
    console.log(newItem);
    onadditem(newItem);
    setDescribtion("");
    setNumx(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <span>What do you need for your journy</span>
      <select value={numx} onChange={(e) => setNumx(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={describtion}
        onChange={(e) => setDescribtion(e.target.value)}
      ></input>
      <button type="submit">submit</button>
    </form>
  );
}

function Body({ items, ondelete, ontoggle, onclear }) {
  const [sorted, setSorted] = useState("input");
  let sortedarr;
  if (sorted === "input") {
    sortedarr = items.slice();
  }
  if (sorted === "description") {
    sortedarr = items
      .slice()
      .sort((a, b) => a.describtion.localeCompare(b.describtion));
  }
  if (sorted === "packed") {
    sortedarr = items.slice().sort((a, b) => a.packed - b.packed);
  }

  return (
    <div className="list">
      <ul>
        {sortedarr.map((item) => (
          <Item item={item} ondelete={ondelete} ontoggle={ontoggle} />
        ))}
      </ul>

      <select value={sorted} onChange={(e) => setSorted(e.target.value)}>
        <option value="input">Sort By Input</option>
        <option value="description">Sort By Describtion</option>
        <option value="packed">Sort By Packed </option>
      </select>
      <button onClick={onclear}>Clear 🧹</button>
    </div>
  );
}
function Item({ item, ondelete, ontoggle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => ontoggle(item.id)}
      />{" "}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.numx} {item.describtion}{" "}
        <button onClick={() => ondelete(item.id)}>❌</button>
      </span>{" "}
    </li>
  );
}

function Footer({ items }) {
  if (!items.length) {
    return <div className="stats">🧳 Start Packing ! ❤️</div>;
  }
  const numlist = items.length;
  const numpaked = items.filter((item) => item.packed).length;
  const numpercent = Math.round((numpaked / numlist) * 100);

  return (
    <footer className="stats">
      {numpercent == 100 ? (
        <div>You are all done 💯🚀 </div>
      ) : (
        <div>
          You have added {numlist} items to your packing list {numpaked} of them
          are packed you're
          <inline> </inline>
          {numpercent}% done!
        </div>
      )}
    </footer>
  );
}
