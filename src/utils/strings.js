export const playerNameMatch = (player, term) => {
  return (
    player &&
    term &&
    player.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
  );
};

export const toTitleCase = str =>
  str.replace(
    /\w\S*/g,
    sub => sub.charAt(0).toUpperCase() + sub.substr(1).toLowerCase()
  );
