/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FiEdit, FiEye, FiHome, FiPlus, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import {
  Container,
  Content,
  Title,
  Search,
  TableContainer,
  SubTitle,
  Tutorial,
} from './styles';

interface PortfoliosProps {
  _id: string;
  nameChildren: string;
  classRoom: string;
  age: number;
}

const Dashboard: React.FC = () => {
  const [portfolios, setPortifolios] = useState<PortfoliosProps[]>([]);
  const [portfoliosManager, setPortifoliosManager] = useState<
    PortfoliosProps[]
  >([]);
  const [portfoliosWithPermission, setPortifoliosWithPermission] = useState<
    PortfoliosProps[]
  >([]);
  const [searchPortfolio, setSearchPortfolio] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    api.get('/portfolio').then(response => {
      setPortifolios(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/permission').then(response => {
      setPortifoliosWithPermission(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/managers').then(response => {
      setPortifoliosManager(response.data);
    });
  }, []);

  const results = !searchPortfolio
    ? portfolios
    : portfolios.filter(portfolio =>
        portfolio.nameChildren
          .toLowerCase()
          .includes(searchPortfolio.toLocaleLowerCase()),
      );

  const results2 = !searchPortfolio
    ? portfoliosWithPermission
    : portfoliosWithPermission.filter(portfolio =>
        portfolio.nameChildren
          .toLowerCase()
          .includes(searchPortfolio.toLocaleLowerCase()),
      );

  const results3 = !searchPortfolio
    ? portfoliosManager
    : portfoliosManager.filter(portfolio =>
        portfolio.nameChildren
          .toLowerCase()
          .includes(searchPortfolio.toLocaleLowerCase()),
      );

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchPortfolio(event.target.value);
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Title>
          <h1>Portifólios</h1>

          {/* <Link to="/createportfolio">
            <div>
              <FiPlus size={20} />
            </div>
            <label>Criar Novo Portfólio</label>
          </Link> */}
          {user.role === 'admin' && (
            <Link to="/createportfolio">
              <div>
                <FiPlus size={20} />
              </div>
              <label>Criar Novo Portfólio</label>
            </Link>
          )}
          {user.role === 'teacher' && (
            <Link to="/createportfolio">
              <div>
                <FiPlus size={20} />
              </div>
              <label>Criar Novo Portfólio</label>
            </Link>
          )}
        </Title>

        {portfolios.length > 1 && (
          <SubTitle>
            <Link to="/createobservationtoclass">
              <div>
                <FiPlus size={20} />
                <FiHome size={20} />
              </div>

              <label>Criar Observação para Grupo</label>
            </Link>
          </SubTitle>
        )}

        {/* <Tutorial>
          <table>
            <thead>
              <th>Ícones</th>
              <th> </th>
            </thead>
            <tbody>
              <tr>
                <td className="icon">
                  <FiEdit />
                </td>
                <td>
                  <span>:Editar Portfólio</span>
                </td>
              </tr>
              <tr>
                <td className="icon">
                  <FiEye />
                </td>
                <td>
                  <span>:Visualizar portfólio</span>
                </td>
              </tr>
              <tr>
                <td className="icon">
                  <FiUserPlus />
                </td>
                <td>
                  <span>:Convidar Parente</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Tutorial> */}

        <Search>
          <label htmlFor="name">Buscar Portfólios:</label>
          <input
            type="text"
            name="name"
            placeholder="Digite aqui para pesquisar portifólio"
            onChange={handleChange}
            defaultValue={searchPortfolio}
          />
        </Search>

        <Tutorial>
          <table>
            <tbody>
              <tr>
                <td>
                  <span>Opções:</span>
                </td>
                <td className="icon">
                  <FiEdit />
                </td>
                <td>
                  <span>- Editar Portfólio</span>
                </td>
                <td className="icon">
                  <FiEye />
                </td>
                <td>
                  <span>- Visualizar portfólio</span>
                </td>
                <td className="icon">
                  <FiUserPlus />
                </td>
                <td>
                  <span>- Convidar Parente</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Tutorial>

        <TableContainer>
          <table>
            <thead>
              <th>Nome</th>
              <th>Turma</th>
              <th>Idade</th>
              <th className="last-column">Opções</th>
            </thead>

            <tbody>
              {results.map(portfolio => (
                <tr key={portfolio._id}>
                  <td className="name">
                    <Link to={`/portfolio/${portfolio._id}`}>
                      {portfolio.nameChildren}
                    </Link>
                  </td>

                  <td className="classroom">{portfolio.classRoom}</td>
                  <td className="age">{portfolio.age}</td>
                  <td className="last-column">
                    <Link to={`/updateportfolio/${portfolio._id}`}>
                      <FiEdit className="first-icon" />
                    </Link>
                    <Link to={`/portfolio/${portfolio._id}`}>
                      <FiEye />
                    </Link>
                    <Link to={`/inviteparent/${portfolio._id}`}>
                      <FiUserPlus className="last-icon" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

            <tbody>
              {results2.map(portfolio => (
                <tr key={portfolio._id}>
                  <td className="name2">
                    <Link to={`/portfolio/${portfolio._id}`}>
                      {portfolio.nameChildren}
                    </Link>
                  </td>

                  <td className="classroom2">{portfolio.classRoom}</td>
                  <td className="age2">{portfolio.age}</td>
                  <td className="last-column2">
                    <Link to={`/portfoliowithpermission/${portfolio._id}`}>
                      <FiEye className="last-icon" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

            <tbody>
              {results3.map(portfolio => (
                <tr key={portfolio._id}>
                  <td className="name3">
                    <Link to={`/portfolio/${portfolio._id}`}>
                      {portfolio.nameChildren}
                    </Link>
                  </td>

                  <td className="classroom3">{portfolio.classRoom}</td>
                  <td className="age3">{portfolio.age}</td>
                  <td className="last-column3">
                    {user.role === 'child' && (
                      <Link to={`/updateportfolio/${portfolio._id}`}>
                        <FiEdit className="first-icon" />
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link to={`/updateportfolio/${portfolio._id}`}>
                        <FiEdit className="first-icon" />
                      </Link>
                    )}
                    {user.role === 'teacher' && (
                      <Link to={`/updateportfolio/${portfolio._id}`}>
                        <FiEdit className="first-icon" />
                      </Link>
                    )}
                    {user.role === 'manager' && (
                      <Link to={`/updateportfolio/${portfolio._id}`}>
                        <FiEdit className="first-icon" />
                      </Link>
                    )}

                    <Link to={`/portfolio/${portfolio._id}`}>
                      {user.role === 'child' ? (
                        <FiEye className="last-icon" />
                      ) : (
                        <FiEye />
                      )}
                    </Link>

                    {user.role === 'admin' && (
                      <Link to={`/inviteparent/${portfolio._id}`}>
                        <FiUserPlus className="last-icon" />
                      </Link>
                    )}
                    {user.role === 'teacher' && (
                      <Link to={`/inviteparent/${portfolio._id}`}>
                        <FiUserPlus className="last-icon" />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;
