// Função para abrir e fechar o modal
const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

// Objeto onde ficarão guardados as informações registradas no modal
const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
  },
  {
    id: 2,
    description: "Web Site",
    amount: 500000,
    date: "23/01/2021",
  },
  {
    id: 3,
    description: "Internet",
    amount: 20000,
    date: "23/01/2021",
  },
];

const Transaction = {
  // Chama todas as transações registradas
  all: transactions,

  // Adicionar nova transação á função (Transactions)

  add(transaction) {
    Transaction.all.push(transaction);
    console.log(Transaction.all);
  },

  // Faz a soma pra cada categoria
  incomes() {
    // somar as entradas
    let incomes = 0;

    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        incomes += transaction.amount;
      }
    });
    return incomes;
  },
  expanses() {
    // somar as saídas
    let expenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        expenses += transaction.amount;
      }
    });
    return expenses;
  },
  total() {
    // entradas - saídas
    return Transaction.incomes() + Transaction.expanses();
  },
};

// Função que converte os numero para formatação em dinheiro BRL
const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value / 100);

    value = value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    return signal + value;
  },
};

// Adiciona os valores de transactions na DOM
const DOM = {
  // informando quem é o container de transactions no HTML
  TransactionsContainer: document.querySelector("#data-table tbody"),

  // Formata os valores para BRL no primeiro container
  updateBalance() {
    document.getElementById("incomes").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expenses").innerHTML = Utils.formatCurrency(
      Transaction.expanses()
    );
    document.getElementById("total").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  // Adicionando nova transação á DOM
  addTransaction(transaction, index) {
    console.log(transactions);

    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHtmlTransaction(transaction);

    DOM.TransactionsContainer.appendChild(tr);

    console.log(tr.innerHTML);
  },

  innerHtmlTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
          <img  src="./assets/minus.svg" 
                alt="Retirar valor">
      </td>
    `;
    return html;
  },
};

const App = {
  init() {},
  reload() {},
};

const Form = {
  description: document.getElementById("input#description"),
  amount: document.getElementById("input#amount"),
  date: document.getElementById("input#date"),

  getValue() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  formatData() {
    console.log("Formatar data");
  },
  validateField() {
    console.log(Form.getValue);
  },
  submit(event) {
    event.preventDefault();

    Form.validateFields();

    Form.formatData();
  },
};

DOM.updateBalance();

Transaction.add({
  id: 39,
  description: "alo",
  amount: 12093,
  date: "23/08/2020",
});

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction);
});
