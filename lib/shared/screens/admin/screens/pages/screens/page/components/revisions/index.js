import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect, mergeFragments} from 'relate-js';
import {restorePage} from 'actions/page';
import Revisions from './revisions';
import {bindActionCreators} from 'redux';

@dataConnect(
  (state) => ({
    pageId: state.router.params.id
  }),
  (dispatch) => bindActionCreators({restorePage}, dispatch),
  (props) => ({
    fragments: mergeFragments(
      Revisions.fragments,
      {
        page: {
          _id: 1,
          updatedDate: 1,
          updatedBy: {
            _id: 1,
            name: 1,
            email: 1
          }
        }
      }
    ),
    variablesTypes: {
      revisions: {
        id: 'ID!'
      },
      page: {
        _id: 'ID!'
      }
    },
    initialVariables: {
      revisions: {
        id: props.pageId
      },
      page: {
        _id: props.pageId
      }
    },
    mutations: {
      restorePage: [{
        type: 'PREPEND',
        field: 'revisions',
        select: 'revision'
      }]
    }
  })
)
export default class PageRevisionsContainer extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    revisions: PropTypes.array,
    restorePage: PropTypes.func.isRequired
  };

  render () {
    const {revisions, page} = this.props;
    return (
      <Revisions
        revisions={revisions}
        current={page}
        restore={this.props.restorePage}
      />
    );
  }
}
