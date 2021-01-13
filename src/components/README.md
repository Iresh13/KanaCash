## About

**` ui/ `**\
it contain dumb component without any logics. You feed some data(via props) and they spit out that formatted data to the view. They're are not very smart they are dumb with one-trick pony 🤣 🇳🇵 like us 🖖 🤼  . They do their job and go away 🤞 🤝 . if you every get time to refactor please define propTypes for the component it will really come handy for new commer ☮ 🙌

**` theme/ `**\
it is an JS object containing a list of colors to use. 🎨

**` network/ `**\
 <NetworkProvider> this component passes our connectivity status down all our child components:
 we just listen for the connectionChange event.That event return true when there's an active internet connection or false when the user has no active internet connection. it update the state when the connectivity status changes.

example:

import { NetworkContext } from './NetworkProvider';
export class ExampleComponent extends React.PureComponent {
  static contextType = NetworkContext;

  render() {
    return (
      <View>
        <Text>You are now {this.context.isConnected ? 'online' : 'offline'}</Text>
      </View>
    );
  }
}

🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥
