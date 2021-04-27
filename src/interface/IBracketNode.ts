import IMatch from "./IMatch";

export default interface IBracketNode {
    match?: IMatch;
    children: IBracketNode[];
    hasParent: boolean;
}