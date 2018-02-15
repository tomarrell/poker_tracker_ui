export const playerNameMatch = (player, term) => {
  return player && term && player.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
}
