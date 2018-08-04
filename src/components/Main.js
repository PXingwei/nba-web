import React from 'react';
import { Profile } from './Profile';
import nba from 'nba';
import { DataViewContainer } from './DataViewContainer';
import { SearchBar } from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants'

export class Main extends React.Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then(
            ( {commonPlayerInfo, playerHeadlineStats} ) => {
                const playerInfo = Object.assign({}, commonPlayerInfo[0], playerHeadlineStats[0]);
                this.setState({ playerInfo });
            }
        );
    }

    render() {
        return (
            <div className="main">
                <SearchBar loadPlayerInfo={this.loadPlayerInfo}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerInfo={this.state.playerInfo}/>
                </div>
            </div>
        );
    }
}