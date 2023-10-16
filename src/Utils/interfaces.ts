export interface Data {
    teamname: string;
    teamcaptain: string;
    teamplayer1: string;
    teamplayer2: string;
    teamplayer3: string;
    teamplayer4: string;
    teamplayer5: string;
    teamplayer6: string;
}

export interface ReceivedData extends Data {
    id: number;
}
