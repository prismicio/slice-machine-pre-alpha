<template>
  <div class="row">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Row'
}
</script>

<style lang="scss" scoped>
.row {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	flex-grow: 1;
	width: 100%;
	> div {
		margin-top: 32px;
	}
	&:last-child {
		margin-bottom: 0;
	}
	&--justify-center {
		justify-content: center;
	}
	&--justify-flex-start {
		justify-content: flex-start;
	}
	&--justify-space-between {
		justify-content: space-between;
	}

	&--align-center {
		align-items: center;
	}
	&--align-end {
		align-items: end;
	}
	&--align-start {
		align-items: start;
	}
}
</style>
