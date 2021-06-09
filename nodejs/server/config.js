const config = {
  endpoint: "https://sotest1.documents.azure.com:443/",
  key: "CU15LqR7bgJibt6ihuN9UdsdjXmQhQKwUQ7IWQSu4xQrtPst2iqt9xzx8q5C5dxyTNhb864ryoxlywwSfhkwEA==",
  databaseId: "dbtest1",
  containerId: "actions",
  partitionKey: { kind: "Hash", paths: ["/actionid/actionname/description/creatoruserid/contributionid/attendees/community/isCommunal/isLocal/isPrivate/isFlagged"] }
};

module.exports = config;
