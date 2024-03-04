
import TrelloID from "./TrelloID"
type WorkspaceData = 
{
    "id": TrelloID,
    "name": string,
    "displayName": string,
    "desc"?: "",
    "descData"?: {
        "emoji"?: {}
    },
    "url"?: "https://trello.com/w/userap10",
    "website"?: null,
    "teamType"?: null,
    "logoHash"?: null,
    "logoUrl"?: null,
    "offering"?: "trello.free",
    "products"?: Array<any>,
    "powerUps"?: Array<any>,
    "idMemberCreator"?: TrelloID,
    "limits"?: {}
}
export default WorkspaceData;