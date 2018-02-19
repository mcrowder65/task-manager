import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Snackbar, Button} from "material-ui";
import CloseIcon from "material-ui-icons/Close";

import {removeMessage} from "../../actions/messages-actions";

const Messages = props => {
    return (
        <div>
            {props.messages.map(m => {
                return (
                    <div key={m.id}>
                        <Snackbar
                            key={m.id}
                            open={true}
                            message={m.message}
                            onRequestClose={() => props.removeMessage(m.id)}
                            action={(
                                <Button
                                    color="accent"
                                    dense
                                    onClick={() => props.removeMessage(m.id)}>
                                    <CloseIcon/>
                                </Button>
                            )}/>
                    </div>
                );
            })
            }
        </div>
    );
};

Messages.propTypes = {
    messages: PropTypes.array,
    removeMessage: PropTypes.func
};

const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeMessage: id => {
            return dispatch(removeMessage(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
