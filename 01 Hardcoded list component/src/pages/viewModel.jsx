import PropTypes from "prop-types";

PropTypes = {
    memberList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            avatarUrl: PropTypes.string.isRequired,
        })
    ).isRequired,
    fetchMemberList: PropTypes.func.isRequired,
};