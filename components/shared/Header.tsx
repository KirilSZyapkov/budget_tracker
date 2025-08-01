export default function Header() {
  return (
    <header>
      <h1>Budget Tracker</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/budgets">Budgets</a></li>
          <li><a href="/categories">Categories</a></li>
          <li><a href="/entries">Entries</a></li>
          <li><a href="/months">Months</a></li>
        </ul>
      </nav>
    </header>
  );
}