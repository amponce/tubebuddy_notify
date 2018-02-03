import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql} from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import gql from 'graphql-tag'

class CreatePage extends React.Component {

  state = {
    realname: '',
    handle: '',
    thumbnailUrl: '',
    text: ''
  }

  render() {
    return (
      <Modal
        isOpen
        contentLabel='Tweet'
        style={modalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div className='pa4 flex justify-center bg-white'>
          <div style={{maxWidth: 400}} className=''>
            {this.state.thumbnailUrl &&
              <img
                src={this.state.thumbnailUrl}
                alt=''
                className='w-100 mv3'
              />}
            <input
              className='w-100 pa3 mv2'
              value={this.state.thumbnailUrl}
              placeholder='Thumbnail URL'
              onChange={e => this.setState({thumbnailUrl: e.target.value})}
              autoFocus
            />
              <input
              className='w-100 pa3 mv2'
              value={this.state.realname}
              placeholder='Real Name'
              onChange={e => this.setState({realname: e.target.value})}
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.handle}
              placeholder='Twitter Handle'
              onChange={e => this.setState({handle: e.target.value})}
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.text}
              placeholder='Tweet Something'
              onChange={e => this.setState({text: e.target.value})}
            />
            {this.state.thumbnailUrl &&
              this.state.realname &&
              this.state.handle &&
              this.state.text &&
              <button
                className='pa3 bg-black-10 bn dim ttu pointer'
                onClick={this.handlePost}
              >
                Post
              </button>}
          </div>
        </div>
      </Modal>
    )
  }

  handlePost = async () => {
    const {realname, handle, thumbnailUrl, text } = this.state
    await this.props.createPostMutation({variables: {realname, handle,thumbnailUrl, text }})
    this.props.history.replace('/')
  }
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($realname: String!, $handle: String!, $thumbnailUrl: String!, $text: String!) {
    createPost(realname: $realname, handle: $handle, thumbnailUrl: $thumbnailUrl, text: $text) {
      id
      realname
      handle
      thumbnailUrl
      text
    }
  }
`

const CreatePageWithMutation = graphql(CREATE_POST_MUTATION, {name: 'createPostMutation'})(CreatePage)
export default withRouter(CreatePageWithMutation)
