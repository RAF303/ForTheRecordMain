import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            band: '',
            website: '',
            location: '',
            status: '',
            status2: '',
            skills: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }
    
    onSubmit(e){
        e.preventDefault();
        
        const profileData ={
            handle: this.state.handle,
            band: this.state.band,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            status2: this.state.status2,
            skills: this.state.skills,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        this.props.createProfile(profileData, this.props.history)
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    render(){
        const{ errors, displaySocialInputs} = this.state;

        let SocialInputs;
        
        if(displaySocialInputs){
            SocialInputs = (
                <div>
                    <InputGroup
                    placeholder="Twitter Profile URL"
                    name= "twitter"
                    icon= "fab fa-twitter"
                    value= {this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                    />

                    <InputGroup
                    placeholder="FaceBook Page URL"
                    name= "facebook"
                    icon= "fab fa-facebook"
                    value= {this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                    />

                    <InputGroup
                    placeholder="Linkedin Profile URL"
                    name= "linkedin"
                    icon= "fab fa-linkedin"
                    value= {this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                    />

                    <InputGroup
                    placeholder="YouTube Channel URL"
                    name= "youtube"
                    icon= "fab fa-youtube"
                    value= {this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                    />

                    <InputGroup
                    placeholder="Instagram Page Url"
                    name= "instagram"
                    icon= "fab fa-instagram"
                    value= {this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                    />
                </div>
            )
        }


 // ************** need to change these to take in instruments ****************       
        //select options for  status 
        const options = [
            { label: '* Select your instrument', value: 0 },
            { label: 'Guitar', value: 'Guitar' },
            { label: 'Bass', value: 'Bass' },
            { label: 'Drums', value: 'Drums' },
            { label: 'Manager', value: 'Manager' },
            { label: 'KeyBoard', value: 'KeyBoard' },
            { label: 'Vocals', value: 'Vocals' },
            { label: 'DJ', value: 'DJ' },
            { label: 'Other', value: 'Other' },
        ];

        return (
            <div className= "create=profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className= "display-4 text-crenter">Create Your Profile</h1>
                            <p className="lead text=center">Lets get some info</p>
                            <small className="d-block pb-3">* = required fields</small>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                placeholder="* Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL. Your full name, band name, nickname, etc ..."
                                />

                                <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                options= {options}
                                error={errors.status}
                                info="What instrument do you specialize in?"
                                />

                                <TextFieldGroup
                                placeholder="Band"
                                name="band"
                                value={this.state.band}
                                onChange={this.onChange}
                                error={errors.band}
                                info="Could be your band or one you play for"
                                />

                                <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="could be your own website or a band one"
                                />

                                <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="City or city and state"
                                />

                                <TextFieldGroup
                                placeholder="Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Plese use comma to seperate values"
                                />

                                <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us about yourself"
                                />

                                <SelectListGroup
                                placeholder="Status2"
                                name="status2"
                                value={this.state.status2}
                                onChange={this.onChange}
                                options= {options}
                                error={errors.status2}
                                info="What are you looking for?"
                                />

                                <div className= "mb-3">
                                    <button 
                                    type="button"
                                    onClick={()=>{
                                        this.setState(prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }} className= "btn btn-light">
                                    Add Social Media links 
                                    </button>
                                    <span className= "text-muted">Optinal</span>
                                </div>
                                {SocialInputs}
                                <input type="submit" value="Submit" className="btn btn-info brn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}


CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
