import {Component} from 'react';

export default class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {
          observers: []
        }
      }
    
      addObserver = (observer) => {
        this.setState({ observers: [...this.state.observers, observer] },
          () => {
            this.notify();
          });
      }
    
      removeObserver = (observer) => {
        this.setState({
          observers: this.state.observers.filter(function (obs) {
            return obs !== observer
          })
        }, () => {
          this.notify();
        });
      }
    
      notify = () => {
        if (this.state.observers.length > 0) {
          this.state.observers.forEach(observer => observer.update());
        }
      }
}