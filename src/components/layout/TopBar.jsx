function TopBar({ workingHours, fastContact }) {
  return (
    <header className="topbar reveal">
      <p>{workingHours}</p>
      <p>{fastContact}</p>
    </header>
  )
}

export default TopBar

