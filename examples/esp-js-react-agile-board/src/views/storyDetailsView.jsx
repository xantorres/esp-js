import * as esp from 'esp-js';
import React from 'react';
import EventConsts from '../eventConsts';
import EpicLabel from './epicLabel';
import Story from '../models/story';
import StoryStatus from '../models/storyStatus';

export default class StoryDetailsView extends React.Component {
    static propTypes = {
        story: React.PropTypes.instanceOf(Story).isRequired,
        router: React.PropTypes.instanceOf(esp.Router).isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        // return nextProps.story.isDirty; when https://github.com/esp/esp-js-react/issues/1 is implemented
        return true;
    }

    render() {
        let story = this.props.story;
        let router = this.props.router;
        let isEditing = story.status === StoryStatus.EDITING;
        return (
            <div className='storyDetails'>
                <h1>Story details</h1>
                <input
                    type='text'
                    disabled={!isEditing}
                    value={story.name}
                    onChange={e => router.publishEvent(story.modelId, EventConsts.STORY_NAME_CHANGED, {story, name:e.target.value})} />
                <EpicLabel colour={story.epic.colour} displayText={story.epic.name} />
                <h3>Status: {story.status === StoryStatus.DONE ? 'Done' : 'In Progress'}</h3>
                <h3>Description</h3>
                <textarea
                    value={story.description}
                    disabled={!isEditing}
                    onChange={e => router.publishEvent(story.modelId, EventConsts.STORY_DESCRIPTION_CHANGED, {description: e.target.value, story})}/>
                <h3>History</h3>
                <ul>
                    <li>Lorem ipsum dolor sit amet consectetuer.</li>
                    <li>Aenean commodo ligula eget dolor.</li>
                    <li>Aenean massa cum sociis natoque penatibus.</li>
                </ul>
                <div>
                <input
                    type="button"
                    className={isEditing || story.status === StoryStatus.DONE ? 'hide' : ''}
                    onClick={() => {router.publishEvent(story.modelId, EventConsts.EDIT_STORY, {story})}}
                    value="Edit"/>
                <input
                    type="button"
                    className={isEditing ? '' : 'hide'}
                    onClick={() => {router.publishEvent(story.modelId, EventConsts.CANCEL_EDIT_STORY, {story})}}
                    value="Cancel"/>
                <input
                    type="button"
                    className={isEditing ? '' : 'hide'}
                    onClick={() => {router.publishEvent(story.modelId, EventConsts.SAVE_STORY, {story})}}
                    value="Save"/>
                <input
                    type="button"
                    className={story.status === StoryStatus.DONE ? 'hide' : ''}
                    onClick={() => {router.publishEvent(story.modelId, EventConsts.DONE_STORY, {story})}}
                    value="Done"/>
                </div>
            </div>
        )
    }
}