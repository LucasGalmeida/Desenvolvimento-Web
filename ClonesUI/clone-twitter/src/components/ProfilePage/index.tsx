import React from 'react';

import Feed from '../Feed'

import { Container, Banner, Avatar, ProfileData, LocationIcon, CakeIcon, Followage, EditButton } from './styles';

const ProfilePage: React.FC = () => {
  return (
    <>
      <Container>
        <Banner>
          <Avatar />
        </Banner>

        <ProfileData>
          <EditButton outlined> Editar Pefil </EditButton>

          <h1> Lucas Gabriel</h1>
          <h2> @LucasGalmeida</h2>

          <p>
            Estudante do IFMG
          </p>

          <ul>
            <li>
              <LocationIcon />
              Minas Gerais, Brasil
            </li>
            <li>
              <CakeIcon />
              Nascido(a) em 9 de abril de 1999
            </li>
          </ul>

          <Followage>
            <span>seguindo <strong>94</strong></span>
            <span> <strong>672 </strong>seguidores</span>
          </Followage>

        </ProfileData>

        <Feed />

      </Container>
    </>
  );
}

export default ProfilePage;
