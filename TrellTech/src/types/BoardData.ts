import TrelloID from "./TrelloID";

export default interface BoardData {
    id: TrelloID;
    name: string;
    desc: string;
    descData: any | null;
    closed: boolean;
    idOrganization: string;
    idEnterprise: string | null;
    pinned: boolean;
    url: string;
    shortUrl: string;
    prefs: {
        permissionLevel: string;
        hideVotes: boolean;
        voting: string;
        comments: string;
        invitations: string;
        selfJoin: boolean;
        cardCovers: boolean;
        cardCounts: boolean;
        isTemplate: boolean;
        cardAging: string;
        calendarFeedEnabled: boolean;
        hiddenPluginBoardButtons: string[];
        switcherViews: {
            viewType: string;
            enabled: boolean;
        }[];
        background: string;
        backgroundColor: string;
        backgroundImage: string | null;
        backgroundTile: boolean;
        backgroundBrightness: string;
        backgroundImageScaled: any | null;
        backgroundBottomColor: string;
        backgroundTopColor: string;
        canBePublic: boolean;
        canBeEnterprise: boolean;
        canBeOrg: boolean;
        canBePrivate: boolean;
        canInvite: boolean;
    };
    labelNames: Record<string, string>;
    limits: Record<string, any>;
}

export interface BoardDataUpdate {
    id: TrelloID;
    name: string;
    desc: string;
    descData: any | null;
    closed: boolean;
    idOrganization: TrelloID;
    idEnterprise: string | null;
    pinned: boolean;
    url: string;
    shortUrl: string;
    prefs: {
        permissionLevel: string;
        hideVotes: boolean;
        voting: string;
        comments: string;
        invitations: string;
        selfJoin: boolean;
        cardCovers: boolean;
        cardCounts: boolean;
        isTemplate: boolean;
        cardAging: string;
        calendarFeedEnabled: boolean;
        hiddenPluginBoardButtons: string[];
        switcherViews: {
            viewType: string;
            enabled: boolean;
        }[];
        background: string;
        backgroundColor: string;
        backgroundImage: string | null;
        backgroundTile: boolean;
        backgroundBrightness: string;
        backgroundImageScaled: any | null;
        backgroundBottomColor: string;
        backgroundTopColor: string;
        canBePublic: boolean;
        canBeEnterprise: boolean;
        canBeOrg: boolean;
        canBePrivate: boolean;
        canInvite: boolean;
    };
    labelNames: {
        [key: string]: string;
    };
  
}





