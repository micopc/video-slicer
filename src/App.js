import React from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { PageWrapper, GlobalStyles } from './components/globals'
import VideoPlayer from './components/videoPlayer'
import EditSwitch from './components/editSwitch'

class App extends React.Component {
  state = {
    canEdit: true
  }

  onCanEditChange = canEdit => {
    this.setState({ canEdit })
  }

  render() {
    const { canEdit } = this.state

    return (
      <div>
        <Header />
        <PageWrapper>
          <EditSwitch canEdit={canEdit} onChange={this.onCanEditChange} />
          <VideoPlayer canEdit={canEdit} />
        </PageWrapper>
        <Footer />
        <GlobalStyles />
      </div>
    )
  }
}

export default App
