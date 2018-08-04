import React from 'react';
import { ShotChart } from './ShotChart';
import { CountSlider } from './CountSlider';
import { Radio, Row, Col, Switch } from 'antd';
import _ from 'lodash';

const RadioGroup = Radio.Group;
export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        chartType: 'hexbin',
        displayTooltip: true,
    }

    onCountSliderChange = (count) => {
        this.setState({ minCount : count });
    }

    onChartTypeChange  = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            chartType: e.target.value,
        });
    }

    onTooltipChange = (displayTooltip ) => {
        this.setState({ displayTooltip })
    }

    render() {
        return (
          <div className="data-view">
              <ShotChart playerId={this.props.playerInfo.playerId}
              minCount={this.state.minCount}
              chartType={this.state.chartType}
              displayTooltip={this.state.displayTooltip}/>
              <div className="filters">
                  {
                      this.state.chartType === 'hexbin' ?
                          <CountSlider value={this.state.minCount} onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}/> : <div className="gap"></div>
                  }
                  <Row>
                      <Col span={9} offset={3}>
                          <RadioGroup onChange={this.onChartTypeChange } value={this.state.chartType}>
                              <Radio value={"hexbin"}>Hexbin</Radio>
                              <Radio value={"scatter"}>Scatter</Radio>
                          </RadioGroup>
                      </Col>
                      <Col span={4}>
                          <Switch
                              checkedChildren="On"
                              unCheckedChildren="Off"
                              onChange={this.onTooltipChange}
                              defaultChecked />
                      </Col>
                  </Row>
              </div>
          </div>
        );
    }
}