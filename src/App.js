import React from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { PageWrapper, GlobalStyles } from './components/globals'
import VideoPlayer from './components/videoPlayer'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <PageWrapper>
          <VideoPlayer />
        </PageWrapper>
        <Footer />
        <GlobalStyles />
      </div>
    )
  }
}

export default App
