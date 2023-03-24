exports.matchLink = (link) => {
  const regex = /https:\/\/nbltop100\.org\/members\/[a-z-]+\/$/;
  const matchedLink = link.match(regex);
  if (regex.test(link)) {
    console.log(matchedLink[0]);
    return matchedLink[0];
  }
};
