import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-reveal';
import { Layout } from '../../components/Layout';
import { TestManager } from '../../serviceManager/servicesProvider';
import { connect } from 'react-redux';
import { testsFetchData, testDelete, testCreate } from '../../actions/tests';




/*
function UsersTestList (props) {
    const ItemList = "/tests";
    const ItemEdit = "/tests/edit/:id";
    const ItemNew = "/tests/create";
    const [items, itemsState] = [];
    const [searchQuery, searchState] = useState('');


    const showAll = () => {
        console.log(props)
        props.fetchData();
    }

    const handleSearchQueryChange = (event) => {
        searchState(event.target.value);
    }

    const handleSeachSubmit = (event) => {
        event.preventDefault();

        if (!searchQuery) {
            showAll();
            return;
        }

        TestManager.search(searchQuery).then((response) => {
             itemsState(response);
        });
    }

    const create = (test) => {
        props.create(test)
    }
    const deleteTest = (test) => {
        props.testDelete(test.id);
    }
    const boolStatement = () => {
        if (props.tests.isLoading) {
            return <p>Loading…</p>;
        }
        else if (!props.tests.isLoaded && !props.tests.hasErrored && !props.tests.isLoading) {
            return <p>No results!</p>;
        }
        else if (props.tests.hasErrored && !props.tests.isLoading) {
            return <p> There is some error on server</p>;
        }
        else {
            return '';
        }
    }
    useEffect(() => {
        showAll();
    },[]);
 
        return (<Layout>
            <h1>Tests</h1>
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSeachSubmit}>
                <input className="form-control form-control form-control-sm" type="text" value={searchQuery} onChange={handleSearchQueryChange} placeholder="Search!" />
                <button className="btn btn-outline-success btn-sm" type="submit">Search</button>&nbsp;
            </form>
            {boolStatement()}
            {props.tests.isLoaded && props.tests.items.length > 0 &&

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Theme</th>
                            <th>Questions</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <Fade left >
                        <tbody>
                            {
                                props.tests.items.map((test, index) =>
                                    <tr key={test.id}>
                                        <td>{test.title}</td>
                                        <td>{test.theme}</td>
                                        <td>{test.questions.length}</td>
                                        <td><button className="btn btn-link"><Link to={ItemEdit.replace(":id", props.test)}>Edit</Link></button></td>
                                        <td><button className="btn btn-link" onClick={deleteTest(test )}>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Fade>
                </table>

            }
            <button type="button" className="btn btn-primary" onClick={showAll}>Clear search</button>
            <Link className="btn btn-success" to={ItemNew}>Add Test</Link>
        </Layout>)
    
}
*/

class UsersTestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemList: "/tests",
            ItemEdit: "/tests/edit/:id",
            ItemNew: "/tests/create",
            items: [],
            searchQuery: '',
        };
        console.log(props);
        this.showAll();
        this.boolStatement = this.boolStatement.bind(this);
        this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    }

    showAll() {
        console.log(this.props)
        this.props.fetchData();
    }

    handleSearchQueryChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSeachSubmit(event) {
        event.preventDefault();

        if (!this.state.searchQuery) {
            this.showAll();
            return;
        }

        TestManager.search(this.state.searchQuery).then((response) => {

            this.setState({ tests: response });
        });
    }

    create(test) {
        this.props.create(test)
    }
    delete(test) {
        this.props.testDelete(test.id);
    }
    boolStatement() {
        if (this.props.tests.isLoading) {
            return <p>Loading…</p>;
        }
        else if (!this.props.tests.isLoaded && !this.props.tests.hasErrored && !this.props.tests.isLoading) {
            return <p>No results!</p>;
        }
        else if (this.props.tests.hasErrored && !this.props.tests.isLoading) {
            return <p> There is some error on server</p>;
        }
        else {
            return '';
        }
    }
    render() {

        return (<Layout>
            <h1>Tests</h1>
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSeachSubmit(e)}>
                <input className="form-control form-control form-control-sm" type="text" value={this.props.searchQuery} onChange={(e) => this.handleSearchQueryChange(e)} placeholder="Search!" />
                <button className="btn btn-outline-success btn-sm" type="submit">Search</button>&nbsp;
                </form>
            {this.boolStatement()}           
            {this.props.tests.isLoaded && this.props.tests.items.length > 0 &&

                <table className="table">
                    <thead>
                        <tr> 
                            <th>Name</th>
                            <th>Theme</th>
                        <th>Questions</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <Fade left >
                        <tbody>
                            {
                                this.props.tests.items.map((test, index) =>
                                <tr key={test.id}>
                                    <td>{test.title}</td>
                                    <td>{test.theme}</td>
                                    <td>{test.questions.length}</td>
                                    <td><button className="btn btn-link"><Link to={{ pathname: this.state.ItemEdit.replace(":id", test.id.toString()), state: { test, regime: 'edit', index } }}>Edit</Link></button></td>
                                    <td><button className="btn btn-link" onClick={(e) => this.delete(test)}>Delete</button></td>
                                </tr>
                                )
                            }
                        </tbody>
                    </Fade>
                </table>

            }
            <button type="button" className="btn btn-primary" onClick={(e) => this.showAll()}>Clear search</button>
            <Link className="btn btn-success" to={{ pathname: this.state.ItemNew, regime: 'create' }}>Add Test</Link>
        </Layout>)
    };
 }

const mapStateToProps = (state) => {
    return {
        tests: state.tests
       
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(testsFetchData()),
        testDelete: (id) => dispatch(testDelete(id)),
        testCreate: (test) => dispatch(testCreate(test))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTestList);


