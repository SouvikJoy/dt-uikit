<template>
  <header>
    <dt-navbar expand="lg" light bg="light" container="md" position="top">
      <dt-navbar-brand href="/">
        <img alt="Vue Logo" height="30" src="@/assets/logo.png" />
        DT-KIT
      </dt-navbar-brand>

      <dt-navbar-toggler
        @click="collapse1 = !collapse1"
        target="#navbarSupportedContent"
      />

      <dt-collapse v-model="collapse1" id="navbarSupportedContent">
        <dt-navbar-nav>
          <dt-navbar-item active to="/">Home</dt-navbar-item>
          <dt-navbar-item to="/">About</dt-navbar-item>
          <dt-navbar-item to="/">Contact</dt-navbar-item>
        </dt-navbar-nav>

        <form class="d-flex input-group w-auto">
          <input
            type="search"
            class="form-control"
            placeholder="Type query"
            aria-label="Search"
          />
          <dt-button outline="light"> Search </dt-button>
        </form>
      </dt-collapse>
    </dt-navbar>
  </header>

  <main>
    <dt-container>
      <dt-row class="mb-3 mt-3">
        <dt-col col="4">1 of 1</dt-col>
        <dt-col col="4">1 of 2</dt-col>
        <dt-col col="4">1 of 3</dt-col>
      </dt-row>

      <dt-row class="mb-6">
        <dt-col col="3">2 of 1</dt-col>
        <dt-col col="6">2 of 2</dt-col>
        <dt-col col="3">2 of 3</dt-col>
      </dt-row>

      <dt-accordion v-model="activeItem">
        <dt-accordion-item
          headerTitle="Accordion Item #1"
          collapseId="collapseOne"
        >
          <strong>This is the first item's accordion body.</strong> It is shown
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the dtAccordionItem, though the transition does limit overflow.
        </dt-accordion-item>

        <dt-accordion-item
          headerTitle="Accordion Item #2"
          collapseId="collapseTwo"
        >
          <strong>This is the second item's accordion body.</strong>
          It is hidden by default, until the collapse plugin adds the
          appropriate classes that we use to style each element. These classes
          control the overall appearance, as well as the showing and hiding via
          CSS transitions. You can modify any of this with custom CSS or
          overriding our default variables. It's also worth noting that just
          about any HTML can go within the dtAccordionItem, though the
          transition does limit overflow.
        </dt-accordion-item>

        <dt-accordion-item
          headerTitle="Accordion Item #3"
          collapseId="collapseThree"
        >
          <strong>This is the third item's accordion body.</strong> It is hidden
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the dtAccordionItem, though the transition does limit overflow.
        </dt-accordion-item>
      </dt-accordion>

      <dtRow tag="form" class="g-4 mt-3">
        <dtInput
          inputGroup
          :formOutline="false"
          v-model="input1"
          aria-describedby="basic-addon1"
          aria-label="Username"
          placeholder="Username"
        >
          <template #prepend>
            <span class="input-group-text" id="basic-addon1">@</span>
          </template>
        </dtInput>
        <dtInput
          inputGroup
          :formOutline="false"
          v-model="input2"
          aria-describedby="basic-addon2"
          aria-label="Recipient's username"
          placeholder="Recipient's username"
        >
          <span class="input-group-text" id="basic-addon2">@example.com</span>
        </dtInput>
        <label for="basic-url" class="form-label">Your vanity URL</label>
        <dtInput
          inputGroup
          :formOutline="false"
          v-model="input3"
          id="basic-url"
          aria-describedby="basic-addon3"
        >
          <template #prepend>
            <span class="input-group-text" id="basic-addon3"
              >https://example.com/users/</span
            >
          </template>
        </dtInput>
        <dtInput
          inputGroup
          :formOutline="false"
          v-model="input4"
          aria-label="Amount (to the nearest dollar)"
        >
          <template #prepend>
            <span class="input-group-text">$</span>
          </template>
          <span class="input-group-text">.00</span>
        </dtInput>
        <dtInput
          inputGroup
          :formOutline="false"
          v-model="input5"
          placeholder="Username"
          aria-label="Username"
        >
          <span class="input-group-text">@</span>
          <dtInput
            wrap
            v-model="input6"
            placeholder="Server"
            aria-label="Server"
          />
        </dtInput>
        <dtTextarea
          inputGroup
          :formOutline="false"
          v-model="textarea1"
          aria-label="With textarea"
        >
          <template #prepend>
            <span class="input-group-text">With textarea</span>
          </template>
        </dtTextarea>
      </dtRow>

      <dtTabs v-model="activeTabId4" vertical model-value="" class="mt-3">
        <dtTabNav tabsClasses="mb-3 text-center">
          <dtTabItem :wrap="false" tabId="ex4-1" href="ex4-1">Home</dtTabItem>
          <dtTabItem :wrap="false" tabId="ex4-2" href="ex4-2">
            Profile
          </dtTabItem>
          <dtTabItem :wrap="false" tabId="ex4-3" href="ex4-3">
            Messages
          </dtTabItem>
        </dtTabNav>
        <dtTabContent>
          <dtTabPane tabId="ex4-1">Tab 1 content</dtTabPane>
          <dtTabPane tabId="ex4-2">Tab 2 content</dtTabPane>
          <dtTabPane tabId="ex4-3">Tab 3 content</dtTabPane>
        </dtTabContent>
      </dtTabs>

      <dt-row>
        <dt-col col="6">
          <dtCard class="mb-3" shadow style="width: 25rem">
            <dtCardImg
              top
              src="https://images.unsplash.com/photo-1641494929948-1aa7a81b1a3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              alt="Wild Landscape"
              style="width: 25rem"
            />
            <dtCardBody>
              <dtCardTitle>Card title</dtCardTitle>
              <dtCardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </dtCardText>
              <dtCardText>
                <small class="text-muted">Last updated 3 mins ago</small>
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dt-col>

        <dt-col col="6">
          <dtCard class="mb-3" shadow style="width: 25rem">
            <dtCardBody>
              <dtCardTitle>Card title</dtCardTitle>
              <dtCardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </dtCardText>
              <dtCardText>
                <small class="text-muted">Last updated 3 mins ago</small>
              </dtCardText>
            </dtCardBody>
            <dtCardImg
              bottom
              src="https://images.unsplash.com/photo-1641492927089-5839a7e30e1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              alt="Camera"
            />
          </dtCard>
        </dt-col>
      </dt-row>

      <dt-row>
        <dtCard bg="dark" text="white">
          <dtCardImg
            src="https://images.unsplash.com/photo-1640362998508-4b8a34d5d319?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTc3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Stony Beach"
            overlay
          >
            <dtCardTitle>Card title</dtCardTitle>
            <dtCardText>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </dtCardText>
            <dtCardText>Last updated 3 mins ago</dtCardText>
          </dtCardImg>
        </dtCard>
      </dt-row>

      <dt-row>
        <dtCard class="mb-3 mt-3" style="max-width: 540px">
          <dtRow class="g-0">
            <dtCol md="4">
              <dtCardImg
                fluid
                src="https://images.unsplash.com/photo-1640350758633-5a2a28c408ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTkyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="Trendy Pants and Shoes"
                :style="{ width: '100%' }"
              />
            </dtCol>
            <dtCol md="8">
              <dtCardBody>
                <dtCardTitle>Card title</dtCardTitle>
                <dtCardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </dtCardText>
                <dtCardText>
                  <small class="text-muted">Last updated 3 mins ago</small>
                </dtCardText>
              </dtCardBody>
            </dtCol>
          </dtRow>
        </dtCard>
      </dt-row>

      <dt-row>
        <dt-col col="4">
          <dtCard text="white" bg="primary" class="mb-3">
            <dtCardHeader>Header</dtCardHeader>
            <dtCardBody>
              <dtCardTitle>Primary card title</dtCardTitle>
              <dtCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dt-col>
        <dt-col col="4">
          <dtCard text="white" bg="secondary" class="mb-3">
            <dtCardHeader>Header</dtCardHeader>
            <dtCardBody>
              <dtCardTitle>Secondary card title</dtCardTitle>
              <dtCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dt-col>
        <dt-col col="4">
          <dtCard text="white" bg="success" class="mb-3">
            <dtCardHeader>Header</dtCardHeader>
            <dtCardBody>
              <dtCardTitle>Success card title</dtCardTitle>
              <dtCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dt-col>
        <dt-col col="4">
          <dtCard text="white" bg="danger" class="mb-3">
            <dtCardHeader>Header</dtCardHeader>
            <dtCardBody>
              <dtCardTitle>Danger card title</dtCardTitle>
              <dtCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dt-col>
        <dt-col col="4">
          <dtCard bg="warning" class="mb-3">
            <dtCardHeader>Header</dtCardHeader>
            <dtCardBody>
              <dtCardTitle>Warning card title</dtCardTitle>
              <dtCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dt-col>
        <dt-col col="4">
          <dtCard text="body" bg="info" class="mb-3">
            <dtCardHeader>Header</dtCardHeader>
            <dtCardBody>
              <dtCardTitle>Info card title</dtCardTitle>
              <dtCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dt-col>
        <dt-col col="4">
          <dtCard bg="light" class="mb-3">
            <dtCardHeader>Header</dtCardHeader>
            <dtCardBody>
              <dtCardTitle>Light card title</dtCardTitle>
              <dtCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dt-col>
        <dt-col col="4">
          <dtCard text="white" bg="dark" class="mb-3">
            <dtCardHeader>Header</dtCardHeader>
            <dtCardBody>
              <dtCardTitle>Dark card title</dtCardTitle>
              <dtCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dt-col>
      </dt-row>

      <dtRow :cols="['1', 'md-2']" class="g-4">
        <dtCol>
          <dtCard>
            <dtCardImg
              src="https://images.unsplash.com/photo-1640237501194-b6302e84ce14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjM1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              top
              alt="Hollywood Sign on The Hill"
            />
            <dtCardBody>
              <dtCardTitle>Card title</dtCardTitle>
              <dtCardText>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dtCol>
        <dtCol>
          <dtCard>
            <dtCardImg
              src="https://images.unsplash.com/photo-1640301133543-41fe25ad6450?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjEyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              top
              alt="Palm Springs Road"
            />
            <dtCardBody>
              <dtCardTitle>Card title</dtCardTitle>
              <dtCardText>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dtCol>
        <dtCol>
          <dtCard>
            <dtCardImg
              src="https://images.unsplash.com/photo-1640338950471-7029b44921dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjA1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              top
              alt="Los Angeles Skyscrapers"
            />
            <dtCardBody>
              <dtCardTitle>Card title</dtCardTitle>
              <dtCardText>
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dtCol>
        <dtCol>
          <dtCard>
            <dtCardImg
              src="https://images.unsplash.com/photo-1640262439767-f5bb155adfa7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjY4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              top
              alt="Skyscrapers"
            />
            <dtCardBody>
              <dtCardTitle>Card title</dtCardTitle>
              <dtCardText>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </dtCardText>
            </dtCardBody>
          </dtCard>
        </dtCol>
      </dtRow>

      <dtCarousel
        v-model="carousel6"
        :items="items6"
        :indicators="false"
        fade
      />

      <div class="mt-3">
        <dt-button
          color="warning"
          aria-controls="exampleModal"
          @click="exampleModal = true"
          >Launch demo modal</dt-button
        >

        <dtModal
          id="exampleModal"
          tabindex="-1"
          labelledby="exampleModalLabel"
          v-model="exampleModal"
        >
          <dtModalHeader>
            <dtModalTitle id="exampleModalLabel"> Modal title </dtModalTitle>
          </dtModalHeader>
          <dtModalBody>...</dtModalBody>
          <dtModalFooter>
            <dt-button color="secondary" @click="exampleModal = false"
              >Close</dt-button
            >
            <dt-button color="primary">Save changes</dt-button>
          </dtModalFooter>
        </dtModal>
      </div>

      <dt-row class="mt-3 mb-3">
        <dt-col col="4" v-for="(item, index) in items" :key="index">
          <dt-animated-card :type="item.type">
            <template #title>
              <h3 class="fs-5 fw-bold">Pot with a plant</h3>
            </template>
            <template #img>
              <img
                src="https://media.istockphoto.com/photos/young-beautiful-woman-picture-id1294339577?b=1&k=20&m=1294339577&s=170667a&w=0&h=_5-SM0Dmhb1fhRdz64lOUJMy8oic51GB_2_IPlhCCnU="
                alt=""
              />
            </template>
            <template #text>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </template>
            <template #interactions>
              <dt-button rounded color="dark">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="apple"
                  class="svg-inline--fa fa-apple"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4
                     50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3
                      20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2
                       4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7
                        107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3
                         17.9 76.4 17.9 48.6-.7 90.4-82.5
                          102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4
                           24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8
                            44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
              </dt-button>
              <dt-button rounded class="btn-chat" outline="light">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="apple"
                  class="svg-inline--fa fa-apple"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
                <span class="span"> 54 </span>
              </dt-button>
            </template>
          </dt-animated-card>
        </dt-col>
      </dt-row>

      <div class="mb-3">
        <h1>Example heading <dtBadge color="primary">New</dtBadge></h1>
        <h2>Example heading <dtBadge color="primary">New</dtBadge></h2>
        <h3>Example heading <dtBadge color="primary">New</dtBadge></h3>
        <h4>Example heading <dtBadge color="primary">New</dtBadge></h4>
        <h5>Example heading <dtBadge color="primary">New</dtBadge></h5>
        <h6>Example heading <dtBadge color="primary">New</dtBadge></h6>
      </div>

      <div class="mb-3">
        <dtIcon icon="camera" size="xs" />
        <dtIcon icon="camera" size="sm" />
        <dtIcon icon="camera" size="lg" />
        <dtIcon icon="camera" size="2x" />
        <dtIcon icon="camera" size="3x" />
        <dtIcon icon="camera" size="4x" />
        <dtIcon icon="camera" size="5x" />
        <dtIcon icon="camera" size="6x" />
        <dtIcon icon="camera" size="7x" />
        <dtIcon icon="camera" size="8x" />
        <dtIcon icon="camera" size="9x" />
        <dtIcon icon="camera" size="10x" />
      </div>

      <div class="mb-3">
        <dtBadge color="primary">Primary</dtBadge>
        <dtBadge color="secondary">Secondary</dtBadge>
        <dtBadge color="success">Success</dtBadge>
        <dtBadge color="danger">Danger</dtBadge>
        <dtBadge color="warning" class="text-dark">Warning</dtBadge>
        <dtBadge color="info">Info</dtBadge>
        <dtBadge color="light" class="text-dark">Light</dtBadge>
        <dtBadge color="dark">Dark</dtBadge>
      </div>

      <div class="mb-3">
        <dt-button-group aria-label="Basic example">
          <dt-button tag="a" href="#!" color="primary" class="active">
            Active link
          </dt-button>
          <dt-button tag="a" href="#!" color="primary">Link</dt-button>
          <dt-button tag="a" href="#!" color="primary">Link</dt-button>
        </dt-button-group>
      </div>

      <div
        class="btn-toolbar mb-3"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <dtButtonGroup class="me-2" aria-label="First group">
          <dtButton color="primary">1</dtButton>
          <dtButton color="primary">2</dtButton>
          <dtButton color="primary">3</dtButton>
          <dtButton color="primary">4</dtButton>
        </dtButtonGroup>
        <dtButtonGroup class="me-2" aria-label="Second group">
          <dtButton color="primary">5</dtButton>
          <dtButton color="primary">6</dtButton>
          <dtButton color="primary">7</dtButton>
        </dtButtonGroup>
        <dtButtonGroup aria-label="Third group">
          <dtButton color="primary">8</dtButton>
        </dtButtonGroup>
      </div>

      <dtRow :cols="['1', 'md-3']" class="g-4 mt-3 mb-3">
        <dtCol>
          <dtCard class="h-100">
            <dtCardImg
              src="https://images.unsplash.com/photo-1640746598070-8143cfb76f92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8dG93SlpGc2twR2d8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              top
              alt="Skyscrapers"
            />
            <dtCardBody>
              <dtCardTitle>Card title</dtCardTitle>
              <dtCardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </dtCardText>
            </dtCardBody>
            <dtCardFooter>
              <small class="text-muted">Last updated 3 mins ago</small>
            </dtCardFooter>
          </dtCard>
        </dtCol>
        <dtCol>
          <dtCard class="h-100">
            <dtCardImg
              src="https://images.unsplash.com/photo-1640881277223-d7b53934a97f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              top
              alt="Los Angeles Skyscrapers"
            />
            <dtCardBody>
              <dtCardTitle>Card title</dtCardTitle>
              <dtCardText>
                This card has supporting text below as a natural lead-in to
                additional content.
              </dtCardText>
            </dtCardBody>
            <dtCardFooter>
              <small class="text-muted">Last updated 3 mins ago</small>
            </dtCardFooter>
          </dtCard>
        </dtCol>
        <dtCol>
          <dtCard class="h-100">
            <dtCardImg
              src="https://images.unsplash.com/photo-1641193030363-ff5499786fea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              top
              alt="Palm Springs Road"
            />
            <dtCardBody>
              <dtCardTitle>Card title</dtCardTitle>
              <dtCardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </dtCardText>
            </dtCardBody>
            <dtCardFooter>
              <small class="text-muted">Last updated 3 mins ago</small>
            </dtCardFooter>
          </dtCard>
        </dtCol>
      </dtRow>
    </dt-container>
  </main>

  <footer>
    <dtFooter :text="['center', 'lg-start']">
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
        © 2022 Copyright:
        <a class="text-dark" href="https://debugger.tech/">debugger.tech</a>
      </div>
    </dtFooter>
  </footer>
</template>

<script>
import { ref } from "vue";
import DtNavbarNav from "@/components/dtNavbarNav.vue";
export default {
  name: "Home",
  components: { DtNavbarNav },
  data: () => ({
    items: [
      {
        id: 1,
        type: 1,
      },
      {
        id: 2,
        type: 2,
      },
      {
        id: 3,
        type: 3,
      },
      {
        id: 4,
        type: 4,
      },
      {
        id: 5,
        type: 5,
      },
    ],
  }),
  setup() {
    const activeItem = ref("collapseOne");
    const input1 = ref("");
    const input2 = ref("");
    const input3 = ref("");
    const input4 = ref("");
    const input5 = ref("");
    const input6 = ref("");
    const textarea1 = ref("");
    const activeTabId4 = ref("ex4-1");
    const items6 = [
      {
        src: "https://images.unsplash.com/photo-1640262439767-f5bb155adfa7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjY4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        alt: "Sunset Over the City",
      },
      {
        src: "https://images.unsplash.com/photo-1640146353660-a572042464c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjg4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        alt: "Canyon at Night",
      },
      {
        src: "https://images.unsplash.com/photo-1640224764479-424a6a7a744b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMzAyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        alt: "Cliff Above a Stormy Sea",
      },
    ];
    const carousel6 = ref(0);
    const exampleModal = ref(false);

    return {
      activeItem,
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      textarea1,
      activeTabId4,
      items6,
      carousel6,
      exampleModal,
    };
  },
};
</script>

<style lang="scss"></style>
