<template>
  <div>
    <accordion>
      <accordion-tab headerTitle="Accordion Item #1" collapseId="collapseOne">
        <strong>This is the first item's accordion body.</strong> It is shown by
        default, until the collapse plugin adds the appropriate classes that we
        use to style each element. These classes control the overall appearance,
        as well as the showing and hiding via CSS transitions. You can modify
        any of this with custom CSS or overriding our default variables. It's
        also worth noting that just about any HTML can go within the
        dtAccordionItem, though the transition does limit overflow.
      </accordion-tab>

      <accordion-tab headerTitle="Accordion Item #2" collapseId="collapseTwo">
        <strong>This is the second item's accordion body.</strong>
        It is hidden by default, until the collapse plugin adds the appropriate
        classes that we use to style each element. These classes control the
        overall appearance, as well as the showing and hiding via CSS
        transitions. You can modify any of this with custom CSS or overriding
        our default variables. It's also worth noting that just about any HTML
        can go within the dtAccordionItem, though the transition does limit
        overflow.
      </accordion-tab>

      <accordion-tab headerTitle="Accordion Item #3" collapseId="collapseThree">
        <strong>This is the third item's accordion body.</strong> It is hidden
        by default, until the collapse plugin adds the appropriate classes that
        we use to style each element. These classes control the overall
        appearance, as well as the showing and hiding via CSS transitions. You
        can modify any of this with custom CSS or overriding our default
        variables. It's also worth noting that just about any HTML can go within
        the dtAccordionItem, though the transition does limit overflow.
      </accordion-tab>
    </accordion>
  </div>
</template>

<script>
import Accordion from "debuggervue/accordion";
import AccordionTab from "debuggervue/accordiontab";
export default {
  components: {
    Accordion,
    AccordionTab,
  },
};
</script>
